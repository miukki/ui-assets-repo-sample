
module Overcommit::Hook::PreCommit
  class GruntLint < Base
  	def run
  		result = execute(%w[grunt lint])
  		if result.stdout =~ /without|error/
        return :pass, result.stdout
  		end
  		if result.stdout =~ /error/
  			return :fail, result.stdout
  		end
      if result.stdout =~ /warning/
        return :pass, result.stdout
      end
  		:pass
  	end

  end
end